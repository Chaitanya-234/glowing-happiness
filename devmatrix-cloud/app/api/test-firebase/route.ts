// app/api/debug-firebase/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export async function GET(request: NextRequest) {
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {},
    errors: [],
  };

  try {
    // Check 1: Environment Variables
    debugInfo.checks.envVars = {
      projectId: process.env.FIREBASE_PROJECT_ID || 'MISSING',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'Present' : 'MISSING',
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'Present' : 'MISSING',
      privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
    };

    // Check 2: Firebase App Initialization
    try {
      if (!getApps().length) {
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
        debugInfo.checks.initialization = 'SUCCESS - New app initialized';
      } else {
        debugInfo.checks.initialization = 'SUCCESS - App already initialized';
      }
    } catch (initError: any) {
      debugInfo.checks.initialization = 'FAILED';
      debugInfo.errors.push({
        step: 'initialization',
        message: initError.message,
        code: initError.code,
      });
      throw initError;
    }

    const db = getFirestore();

    // Check 3: Database Connection
    try {
      const collections = await db.listCollections();
      debugInfo.checks.databaseConnection = 'SUCCESS';
      debugInfo.checks.collections = collections.map(c => c.id);
    } catch (dbError: any) {
      debugInfo.checks.databaseConnection = 'FAILED';
      debugInfo.errors.push({
        step: 'database_connection',
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
      });
      throw dbError;
    }

    // Check 4: Subscribers Collection Access
    try {
      const subscribersRef = db.collection('subscribers');
      const snapshot = await subscribersRef.limit(1).get();
      debugInfo.checks.subscribersCollection = {
        status: 'SUCCESS',
        documentCount: snapshot.size,
        collectionPath: subscribersRef.path,
      };
    } catch (collError: any) {
      debugInfo.checks.subscribersCollection = 'FAILED';
      debugInfo.errors.push({
        step: 'subscribers_collection',
        message: collError.message,
        code: collError.code,
        details: collError.details,
      });
      throw collError;
    }

    // Check 5: Write Test
    try {
      const testEmail = `test-${Date.now()}@example.com`;
      const testDocRef = await db.collection('subscribers').add({
        email: testEmail,
        subscribedAt: new Date(),
        status: 'test',
        source: 'debug_test',
      });

      debugInfo.checks.writeTest = {
        status: 'SUCCESS',
        testDocId: testDocRef.id,
        testEmail: testEmail,
      };

      // Clean up test document
      await testDocRef.delete();
      debugInfo.checks.cleanupTest = 'SUCCESS';

    } catch (writeError: any) {
      debugInfo.checks.writeTest = 'FAILED';
      debugInfo.errors.push({
        step: 'write_test',
        message: writeError.message,
        code: writeError.code,
        details: writeError.details,
      });
    }

    // Check 6: Query Test
    try {
      const querySnapshot = await db.collection('subscribers')
        .where('status', '==', 'active')
        .limit(1)
        .get();

      debugInfo.checks.queryTest = {
        status: 'SUCCESS',
        resultsFound: querySnapshot.size,
      };
    } catch (queryError: any) {
      debugInfo.checks.queryTest = 'FAILED';
      debugInfo.errors.push({
        step: 'query_test',
        message: queryError.message,
        code: queryError.code,
        details: queryError.details,
      });
    }

    return NextResponse.json({
      success: debugInfo.errors.length === 0,
      message: debugInfo.errors.length === 0
        ? '✅ All checks passed! Firebase is working correctly.'
        : '❌ Some checks failed. See details below.',
      debugInfo,
    }, {
      status: debugInfo.errors.length === 0 ? 200 : 500
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: '❌ Critical error during debugging',
      error: error.message,
      debugInfo,
    }, { status: 500 });
  }
}