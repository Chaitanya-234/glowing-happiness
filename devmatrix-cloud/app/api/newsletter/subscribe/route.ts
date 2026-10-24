// app/api/newsletter/subscribe/route.ts - FINAL WORKING VERSION
import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin ONCE
let db: admin.firestore.Firestore | null = null;

function getFirestore() {
  if (db) {
    return db; // Return existing instance
  }

  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });

    console.log('✅ Firebase Admin initialized');
  }

  // Initialize Firestore once and cache it
  db = admin.firestore();

  return db;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log('📧 Newsletter request for:', email);

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Get Firestore instance
    const firestore = getFirestore();

    console.log('🔍 Querying subscribers collection...');

    // Check if email already exists
    const subscribersRef = firestore.collection('subscribers');
    const existingSubscriber = await subscribersRef
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    console.log('✅ Query completed. Documents found:', existingSubscriber.size);

    if (!existingSubscriber.empty) {
      console.log('⚠️ Email already subscribed');
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Add subscriber
    console.log('➕ Adding new subscriber...');
    const docRef = await subscribersRef.add({
      email: normalizedEmail,
      subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      source: 'newsletter_cta',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    console.log('✅ Subscriber added! Doc ID:', docRef.id);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
    });

  } catch (error: any) {
    console.error('❌ Newsletter error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    return NextResponse.json(
      {
        error: 'Failed to subscribe. Please try again.',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
        } : undefined,
      },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}