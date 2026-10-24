// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { Stage, Layer, Group, Transformer, Rect, Circle, Line, Text, Arrow, Path, Ellipse as KonvaEllipse, RegularPolygon } from 'react-konva';
import {
  FileText, FolderOpen, Save, Download, Upload, Undo, Redo, ZoomIn, ZoomOut,
  Maximize, Grid, Mouse, Move, Square, Trash2, Copy, Scissors, ClipboardPaste,
  X, ChevronRight, ChevronDown, Plus, Minus, Search, MoreVertical, Settings,
  Eye, EyeOff, Lock, Unlock, Layers, Code, Package, Box, Activity, GitBranch,
  Users, Database, Server, Layout, Maximize2, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, ArrowUp, ArrowDown, ArrowLeft, ArrowRight as ArrowRightIcon
} from 'lucide-react';

const GRID_SIZE = 20;

// ==================== ALL SHAPE COMPONENTS ====================

// Class Diagram Shapes
const ClassShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Rect width={shape.width} height={35} fill="#e5e7eb" />
    <Text
      text={shape.name || 'ClassName'}
      width={shape.width}
      height={35}
      align="center"
      verticalAlign="middle"
      fontSize={14}
      fontStyle="bold"
      fill="#111827"
    />
    <Line points={[0, 35, shape.width, 35]} stroke="#9ca3af" strokeWidth={1} />
    <Text
      text={shape.attributes || '+ attribute: Type'}
      x={8}
      y={42}
      width={shape.width - 16}
      fontSize={11}
      fill="#374151"
      lineHeight={1.4}
    />
    <Line points={[0, shape.height * 0.6, shape.width, shape.height * 0.6]} stroke="#9ca3af" strokeWidth={1} />
    <Text
      text={shape.methods || '+ method(): Type'}
      x={8}
      y={shape.height * 0.6 + 7}
      width={shape.width - 16}
      fontSize={11}
      fill="#374151"
      lineHeight={1.4}
    />
  </Group>
));

const InterfaceShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text="«interface»"
      width={shape.width}
      align="center"
      y={8}
      fontSize={10}
      fill="#64748b"
      fontStyle="italic"
    />
    <Text
      text={shape.name || 'InterfaceName'}
      width={shape.width}
      align="center"
      y={24}
      fontSize={14}
      fontStyle="bold"
      fill="#111827"
    />
    <Line points={[0, 45, shape.width, 45]} stroke="#9ca3af" strokeWidth={1} />
    <Text
      text={shape.operations || '+ operation(): Type'}
      x={8}
      y={52}
      width={shape.width - 16}
      fontSize={11}
      fill="#374151"
      lineHeight={1.4}
    />
  </Group>
));

const AbstractClassShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Rect width={shape.width} height={35} fill="#e5e7eb" />
    <Text
      text={shape.name || 'AbstractClass'}
      width={shape.width}
      height={35}
      align="center"
      verticalAlign="middle"
      fontSize={14}
      fontStyle="bold italic"
      fill="#111827"
    />
    <Line points={[0, 35, shape.width, 35]} stroke="#9ca3af" strokeWidth={1} />
    <Text
      text={shape.attributes || '+ attribute: Type'}
      x={8}
      y={42}
      width={shape.width - 16}
      fontSize={11}
      fill="#374151"
      lineHeight={1.4}
    />
    <Line points={[0, shape.height * 0.6, shape.width, shape.height * 0.6]} stroke="#9ca3af" strokeWidth={1} />
    <Text
      text={shape.methods || '+ abstractMethod(): Type'}
      x={8}
      y={shape.height * 0.6 + 7}
      width={shape.width - 16}
      fontSize={11}
      fill="#374151"
      fontStyle="italic"
      lineHeight={1.4}
    />
  </Group>
));

const EnumerationShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text="«enumeration»"
      width={shape.width}
      align="center"
      y={8}
      fontSize={10}
      fill="#64748b"
      fontStyle="italic"
    />
    <Text
      text={shape.name || 'EnumName'}
      width={shape.width}
      align="center"
      y={24}
      fontSize={14}
      fontStyle="bold"
      fill="#111827"
    />
    <Line points={[0, 45, shape.width, 45]} stroke="#9ca3af" strokeWidth={1} />
    <Text
      text={shape.literals || 'VALUE1\nVALUE2\nVALUE3'}
      x={8}
      y={52}
      width={shape.width - 16}
      fontSize={11}
      fill="#374151"
      lineHeight={1.4}
    />
  </Group>
));

// Use Case Diagram Shapes
const UseCaseShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <KonvaEllipse
      x={shape.width / 2}
      y={shape.height / 2}
      radiusX={shape.width / 2}
      radiusY={shape.height / 2}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text={shape.name || 'Use Case'}
      x={0}
      y={shape.height / 2 - 8}
      width={shape.width}
      align="center"
      fontSize={12}
      fill="#111827"
    />
  </Group>
));

const ActorShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Circle
      x={shape.width / 2}
      y={15}
      radius={12}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={2.5 / zoom}
      fill="#ffffff"
    />
    <Line
      points={[shape.width / 2, 27, shape.width / 2, 60]}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={2.5 / zoom}
    />
    <Line
      points={[shape.width / 2 - 18, 38, shape.width / 2 + 18, 38]}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={2.5 / zoom}
    />
    <Line
      points={[shape.width / 2, 60, shape.width / 2 - 18, 85]}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={2.5 / zoom}
    />
    <Line
      points={[shape.width / 2, 60, shape.width / 2 + 18, 85]}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={2.5 / zoom}
    />
    <Text
      text={shape.name || 'Actor'}
      y={90}
      x={-15}
      width={shape.width + 30}
      align="center"
      fontSize={12}
      fontStyle="bold"
      fill="#111827"
    />
  </Group>
));

const SystemBoundaryShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill="transparent"
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2.5) / zoom}
    />
    <Rect
      x={0}
      y={0}
      width={Math.min(shape.width * 0.25, 100)}
      height={35}
      fill={shape.fill || '#f3f4f6'}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2.5) / zoom}
    />
    <Text
      text={shape.name || 'System'}
      x={8}
      y={10}
      fontSize={13}
      fontStyle="bold"
      fill="#111827"
    />
  </Group>
));

// State Diagram Shapes
const StateShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      cornerRadius={10}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text={shape.name || 'State'}
      x={8}
      y={12}
      width={shape.width - 16}
      fontSize={13}
      fontStyle="bold"
      fill="#111827"
      align="center"
    />
    {shape.activities && (
      <Text
        text={shape.activities}
        x={8}
        y={35}
        width={shape.width - 16}
        fontSize={10}
        fill="#374151"
        lineHeight={1.3}
      />
    )}
  </Group>
));

const InitialStateShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onDragEnd={onDragEnd}
  >
    <Circle
      x={shape.width / 2}
      y={shape.height / 2}
      radius={shape.width / 2}
      fill="#111827"
      stroke={isSelected ? '#3b82f6' : '#1e293b'}
      strokeWidth={2}
    />
  </Group>
));

const FinalStateShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onDragEnd={onDragEnd}
  >
    <Circle
      x={shape.width / 2}
      y={shape.height / 2}
      radius={shape.width / 2}
      fill="#ffffff"
      stroke={isSelected ? '#3b82f6' : '#1e293b'}
      strokeWidth={3}
    />
    <Circle
      x={shape.width / 2}
      y={shape.height / 2}
      radius={shape.width / 2 - 6}
      fill="#111827"
    />
  </Group>
));

const ChoiceStateShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onDragEnd={onDragEnd}
  >
    <RegularPolygon
      x={shape.width / 2}
      y={shape.height / 2}
      sides={4}
      radius={shape.width / 2}
      fill={shape.fill || '#ffffff'}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={2}
    />
  </Group>
));

// Activity Diagram Shapes
const ActionShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      cornerRadius={20}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text={shape.name || 'Action'}
      x={8}
      y={shape.height / 2 - 8}
      width={shape.width - 16}
      fontSize={12}
      fill="#111827"
      align="center"
    />
  </Group>
));

const DecisionShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <RegularPolygon
      x={shape.width / 2}
      y={shape.height / 2}
      sides={4}
      radius={shape.width / 2}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text={shape.name || '?'}
      x={shape.width / 2 - 10}
      y={shape.height / 2 - 8}
      width={20}
      fontSize={16}
      fontStyle="bold"
      fill="#111827"
      align="center"
    />
  </Group>
));

const ForkJoinShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill="#111827"
      stroke={isSelected ? '#3b82f6' : '#1e293b'}
      strokeWidth={2}
    />
  </Group>
));

const InitialNodeShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onDragEnd={onDragEnd}
  >
    <Circle
      x={shape.width / 2}
      y={shape.height / 2}
      radius={shape.width / 2}
      fill="#111827"
      stroke={isSelected ? '#3b82f6' : '#1e293b'}
      strokeWidth={2}
    />
  </Group>
));

const FinalNodeShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onDragEnd={onDragEnd}
  >
    <Circle
      x={shape.width / 2}
      y={shape.height / 2}
      radius={shape.width / 2}
      fill="#ffffff"
      stroke={isSelected ? '#3b82f6' : '#1e293b'}
      strokeWidth={3}
    />
    <Circle
      x={shape.width / 2}
      y={shape.height / 2}
      radius={shape.width / 2 - 6}
      fill="#111827"
    />
  </Group>
));

// Sequence Diagram Shapes
const LifelineShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={45}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Text
      text={shape.name || 'Object'}
      x={5}
      y={15}
      width={shape.width - 10}
      fontSize={12}
      fill="#111827"
      align="center"
    />
    <Line
      points={[shape.width / 2, 45, shape.width / 2, shape.height]}
      stroke={isSelected ? '#3b82f6' : '#6b7280'}
      strokeWidth={1}
      dash={[5, 5]}
    />
  </Group>
));

const ActivationShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill="#dbeafe"
      stroke={isSelected ? '#3b82f6' : '#1e293b'}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
    />
  </Group>
));

// Component Diagram Shapes
const ComponentShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Rect
      x={shape.width - 40}
      y={10}
      width={20}
      height={12}
      fill="#ffffff"
      stroke={shape.stroke}
      strokeWidth={1.5}
    />
    <Rect
      x={shape.width - 40}
      y={26}
      width={20}
      height={12}
      fill="#ffffff"
      stroke={shape.stroke}
      strokeWidth={1.5}
    />
    <Text
      text="«component»"
      x={8}
      y={12}
      fontSize={10}
      fill="#64748b"
      fontStyle="italic"
    />
    <Text
      text={shape.name || 'Component'}
      x={8}
      y={28}
      width={shape.width - 50}
      fontSize={13}
      fontStyle="bold"
      fill="#111827"
    />
  </Group>
));

const ArtifactShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Line
      points={[0, 15, 0, shape.height, shape.width, shape.height, shape.width, 0, shape.width - 15, 0, shape.width - 15, 15, shape.width, 15]}
      closed
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Line
      points={[shape.width - 15, 0, shape.width - 15, 15, shape.width, 15]}
      stroke={shape.stroke}
      strokeWidth={1.5}
    />
    <Text
      text="«artifact»"
      x={8}
      y={25}
      fontSize={10}
      fill="#64748b"
      fontStyle="italic"
    />
    <Text
      text={shape.name || 'Artifact'}
      x={8}
      y={40}
      width={shape.width - 20}
      fontSize={12}
      fontStyle="bold"
      fill="#111827"
    />
  </Group>
));

// Deployment Diagram Shapes
const NodeShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Line
      points={[20, 0, shape.width, 0, shape.width, shape.height - 20, shape.width - 20, shape.height, 0, shape.height, 0, 20]}
      closed
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Line points={[0, 20, 20, 0]} stroke={shape.stroke} strokeWidth={1.5} />
    <Line points={[0, 20, 20, 20, 20, 0]} stroke={shape.stroke} strokeWidth={1.5} />
    <Text
      text={`«node»\n${shape.name || 'Node'}`}
      x={10}
      y={shape.height / 2 - 15}
      width={shape.width - 30}
      align="center"
      fontSize={12}
      fill="#111827"
    />
  </Group>
));

const PackageShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      x={0}
      y={25}
      width={shape.width}
      height={shape.height - 25}
      fill={shape.fill}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
      shadowBlur={5}
      shadowOpacity={0.2}
    />
    <Rect
      x={0}
      y={0}
      width={Math.min(shape.width * 0.4, 80)}
      height={25}
      fill="#e5e7eb"
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
    />
    <Text
      text={shape.name || 'Package'}
      x={8}
      y={32}
      width={shape.width - 16}
      fontSize={13}
      fontStyle="bold"
      fill="#111827"
    />
  </Group>
));

const NoteShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Line
      points={[0, 0, shape.width - 20, 0, shape.width, 20, shape.width, shape.height, 0, shape.height]}
      closed
      fill="#fef3c7"
      stroke={isSelected ? '#3b82f6' : '#d97706'}
      strokeWidth={(shape.strokeWidth || 1.5) / zoom}
      shadowBlur={3}
      shadowOpacity={0.15}
    />
    <Line
      points={[shape.width - 20, 0, shape.width - 20, 20, shape.width, 20]}
      closed
      fill="#fde68a"
      stroke="#d97706"
      strokeWidth={1}
    />
    <Text
      text={shape.text || 'Note'}
      x={8}
      y={25}
      width={shape.width - 16}
      height={shape.height - 30}
      fontSize={11}
      fill="#92400e"
      lineHeight={1.4}
    />
  </Group>
));

const FrameShape = forwardRef(({ shape, isSelected, onSelect, onDragEnd, onTransformEnd, zoom }, ref) => (
  <Group
    ref={ref}
    x={shape.x}
    y={shape.y}
    draggable
    onClick={onSelect}
    onTap={onSelect}
    onDragEnd={onDragEnd}
    onTransformEnd={onTransformEnd}
  >
    <Rect
      width={shape.width}
      height={shape.height}
      fill="transparent"
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
    />
    <Rect
      x={0}
      y={0}
      width={Math.min(shape.width * 0.2, 80)}
      height={30}
      fill={shape.fill || '#f3f4f6'}
      stroke={isSelected ? '#3b82f6' : shape.stroke}
      strokeWidth={(shape.strokeWidth || 2) / zoom}
    />
    <Text
      text={shape.name || 'Frame'}
      x={8}
      y={8}
      fontSize={12}
      fontStyle="bold"
      fill="#111827"
    />
  </Group>
));

// Connection Component
function Connection({ connection, shapes, isSelected, onSelect, zoom }) {
  const fromShape = shapes.find(s => s.id === connection.from);
  const toShape = shapes.find(s => s.id === connection.to);

  if (!fromShape || !toShape) return null;

  const fromCenter = {
    x: fromShape.x + (fromShape.width || 20) / 2,
    y: fromShape.y + (fromShape.height || 20) / 2
  };

  const toCenter = {
    x: toShape.x + (toShape.width || 20) / 2,
    y: toShape.y + (toShape.height || 20) / 2
  };

  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const angle = Math.atan2(dy, dx);

  const points = [fromCenter.x, fromCenter.y, toCenter.x, toCenter.y];
  const isDashed = connection.style === 'dashed';
  const strokeColor = isSelected ? '#3b82f6' : '#64748b';
  const strokeWidth = isSelected ? 2.5 : 2;

  // Diamond shapes (aggregation/composition)
  if (connection.endShape === 'diamond' || connection.endShape === 'filledDiamond') {
    const diamondSize = 15;
    const endX = toCenter.x - Math.cos(angle) * diamondSize * 1.5;
    const endY = toCenter.y - Math.sin(angle) * diamondSize * 1.5;

    return (
      <Group>
        <Line
          points={[fromCenter.x, fromCenter.y, endX, endY]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          dash={isDashed ? [10, 5] : undefined}
          onClick={onSelect}
          onTap={onSelect}
        />
        <Line
          points={[
            endX - Math.cos(angle - Math.PI / 2) * diamondSize / 2,
            endY - Math.sin(angle - Math.PI / 2) * diamondSize / 2,
            toCenter.x,
            toCenter.y,
            endX + Math.cos(angle - Math.PI / 2) * diamondSize / 2,
            endY + Math.sin(angle - Math.PI / 2) * diamondSize / 2,
            endX - Math.cos(angle) * diamondSize,
            endY - Math.sin(angle) * diamondSize
          ]}
          closed
          fill={connection.endShape === 'filledDiamond' ? strokeColor : '#ffffff'}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          onClick={onSelect}
          onTap={onSelect}
        />
      </Group>
    );
  }

  // Triangle (generalization/realization)
  if (connection.endShape === 'triangle') {
    const triangleSize = 14;
    const endX = toCenter.x - Math.cos(angle) * triangleSize * 1.2;
    const endY = toCenter.y - Math.sin(angle) * triangleSize * 1.2;

    return (
      <Group>
        <Line
          points={[fromCenter.x, fromCenter.y, endX, endY]}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          dash={isDashed ? [10, 5] : undefined}
          onClick={onSelect}
          onTap={onSelect}
        />
        <Line
          points={[
            endX - Math.cos(angle - Math.PI / 2) * triangleSize / 2,
            endY - Math.sin(angle - Math.PI / 2) * triangleSize / 2,
            toCenter.x,
            toCenter.y,
            endX + Math.cos(angle - Math.PI / 2) * triangleSize / 2,
            endY + Math.sin(angle - Math.PI / 2) * triangleSize / 2
          ]}
          closed
          fill="#ffffff"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          onClick={onSelect}
          onTap={onSelect}
        />
      </Group>
    );
  }

  // Standard arrow
  return (
    <Arrow
      points={points}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      dash={isDashed ? [10, 5] : undefined}
      onClick={onSelect}
      onTap={onSelect}
      pointerLength={connection.endShape === 'arrow' ? 12 : 0}
      pointerWidth={connection.endShape === 'arrow' ? 12 : 0}
    />
  );
}

// Shape Registry
const SHAPE_COMPONENTS = {
  class: ClassShape,
  interface: InterfaceShape,
  abstractClass: AbstractClassShape,
  enumeration: EnumerationShape,
  usecase: UseCaseShape,
  actor: ActorShape,
  systemBoundary: SystemBoundaryShape,
  state: StateShape,
  initialState: InitialStateShape,
  finalState: FinalStateShape,
  choiceState: ChoiceStateShape,
  action: ActionShape,
  decision: DecisionShape,
  fork: ForkJoinShape,
  join: ForkJoinShape,
  initialNode: InitialNodeShape,
  finalNode: FinalNodeShape,
  lifeline: LifelineShape,
  activation: ActivationShape,
  component: ComponentShape,
  artifact: ArtifactShape,
  node: NodeShape,
  package: PackageShape,
  note: NoteShape,
  frame: FrameShape
};

// Universal Shape Wrapper
function UniversalShape({ shape, isSelected, onSelect, onChange, zoom }) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    onChange({
      ...shape,
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...shape,
      x: node.x(),
      y: node.y(),
      width: Math.max(30, (shape.width || 100) * scaleX),
      height: Math.max(30, (shape.height || 80) * scaleY),
      rotation: node.rotation()
    });
  };

  const ShapeComponent = SHAPE_COMPONENTS[shape.type];

  if (!ShapeComponent) {
    return null;
  }

  const keepRatio = ['usecase', 'initialState', 'finalState', 'initialNode', 'finalNode', 'choiceState'].includes(shape.type);

  return (
    <>
      <ShapeComponent
        ref={shapeRef}
        shape={shape}
        isSelected={isSelected}
        onSelect={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        zoom={zoom}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          keepRatio={keepRatio}
          enabledAnchors={keepRatio ? ['top-left', 'top-right', 'bottom-left', 'bottom-right'] : undefined}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 30 || newBox.height < 30) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

// ==================== UML SHAPES CATALOG ====================
const UML_SHAPES = {
  CLASS: { type: 'class', name: 'Class', category: 'Class Diagram', icon: Box },
  INTERFACE: { type: 'interface', name: 'Interface', category: 'Class Diagram', icon: Box },
  ABSTRACT_CLASS: { type: 'abstractClass', name: 'Abstract Class', category: 'Class Diagram', icon: Box },
  ENUMERATION: { type: 'enumeration', name: 'Enumeration', category: 'Class Diagram', icon: Database },

  USECASE: { type: 'usecase', name: 'Use Case', category: 'Use Case Diagram', icon: Circle },
  ACTOR: { type: 'actor', name: 'Actor', category: 'Use Case Diagram', icon: Users },
  SYSTEM_BOUNDARY: { type: 'systemBoundary', name: 'System Boundary', category: 'Use Case Diagram', icon: Square },

  STATE: { type: 'state', name: 'State', category: 'State Diagram', icon: Square },
  INITIAL_STATE: { type: 'initialState', name: 'Initial State', category: 'State Diagram', icon: Circle },
  FINAL_STATE: { type: 'finalState', name: 'Final State', category: 'State Diagram', icon: Circle },
  CHOICE_STATE: { type: 'choiceState', name: 'Choice', category: 'State Diagram', icon: Activity },

  ACTION: { type: 'action', name: 'Action', category: 'Activity Diagram', icon: Activity },
  DECISION: { type: 'decision', name: 'Decision', category: 'Activity Diagram', icon: GitBranch },
  FORK: { type: 'fork', name: 'Fork', category: 'Activity Diagram', icon: GitBranch },
  JOIN: { type: 'join', name: 'Join', category: 'Activity Diagram', icon: GitBranch },
  INITIAL_NODE: { type: 'initialNode', name: 'Initial Node', category: 'Activity Diagram', icon: Circle },
  FINAL_NODE: { type: 'finalNode', name: 'Final Node', category: 'Activity Diagram', icon: Activity },

  LIFELINE: { type: 'lifeline', name: 'Lifeline', category: 'Sequence Diagram', icon: Square },
  ACTIVATION: { type: 'activation', name: 'Activation', category: 'Sequence Diagram', icon: Square },

  COMPONENT: { type: 'component', name: 'Component', category: 'Component Diagram', icon: Package },
  ARTIFACT: { type: 'artifact', name: 'Artifact', category: 'Component Diagram', icon: FileText },

  NODE: { type: 'node', name: 'Node', category: 'Deployment Diagram', icon: Server },

  PACKAGE: { type: 'package', name: 'Package', category: 'Package Diagram', icon: Package },

  NOTE: { type: 'note', name: 'Note', category: 'General', icon: FileText },
  FRAME: { type: 'frame', name: 'Frame', category: 'General', icon: Square }
};

const RELATIONSHIPS = {
  association: { type: 'association', name: 'Association', style: 'solid', endShape: 'arrow' },
  aggregation: { type: 'aggregation', name: 'Aggregation', style: 'solid', endShape: 'diamond' },
  composition: { type: 'composition', name: 'Composition', style: 'solid', endShape: 'filledDiamond' },
  generalization: { type: 'generalization', name: 'Generalization', style: 'solid', endShape: 'triangle' },
  realization: { type: 'realization', name: 'Realization', style: 'dashed', endShape: 'triangle' },
  dependency: { type: 'dependency', name: 'Dependency', style: 'dashed', endShape: 'arrow' },
  transition: { type: 'transition', name: 'Transition', style: 'solid', endShape: 'arrow' },
  controlFlow: { type: 'controlFlow', name: 'Control Flow', style: 'solid', endShape: 'arrow' },
  message: { type: 'message', name: 'Message', style: 'solid', endShape: 'arrow' }
};

// ==================== EXAMPLE TEMPLATES (abbreviated for space) ====================
const EXAMPLE_TEMPLATES = {
  'blank': {
    name: 'Blank Diagram',
    type: 'Class Diagram',
    shapes: [],
    connections: []
  }
};

// ==================== PROPERTIES PANEL ====================
function PropertiesPanel({ selectedShape, onUpdate }) {
  if (!selectedShape) {
    return (
      <div className="p-4 text-gray-400 text-sm">
        No element selected
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-300">Name</label>
        <input
          type="text"
          value={selectedShape.name || ''}
          onChange={(e) => onUpdate({ ...selectedShape, name: e.target.value })}
          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {(selectedShape.type === 'class' || selectedShape.type === 'abstractClass') && (
        <>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-300">Attributes</label>
            <textarea
              value={selectedShape.attributes || ''}
              onChange={(e) => onUpdate({ ...selectedShape, attributes: e.target.value })}
              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
              rows={4}
              placeholder="+ attribute: Type"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-300">Methods</label>
            <textarea
              value={selectedShape.methods || ''}
              onChange={(e) => onUpdate({ ...selectedShape, methods: e.target.value })}
              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
              rows={4}
              placeholder="+ method(): Type"
            />
          </div>
        </>
      )}

      {selectedShape.type === 'interface' && (
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-300">Operations</label>
          <textarea
            value={selectedShape.operations || ''}
            onChange={(e) => onUpdate({ ...selectedShape, operations: e.target.value })}
            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
            rows={4}
            placeholder="+ operation(): Type"
          />
        </div>
      )}

      {selectedShape.type === 'enumeration' && (
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-300">Literals</label>
          <textarea
            value={selectedShape.literals || ''}
            onChange={(e) => onUpdate({ ...selectedShape, literals: e.target.value })}
            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none font-mono"
            rows={4}
            placeholder="VALUE1\nVALUE2"
          />
        </div>
      )}

      {(selectedShape.type === 'note') && (
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-300">Text</label>
          <textarea
            value={selectedShape.text || ''}
            onChange={(e) => onUpdate({ ...selectedShape, text: e.target.value })}
            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            rows={5}
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-300">Fill Color</label>
        <input
          type="color"
          value={selectedShape.fill || '#ffffff'}
          onChange={(e) => onUpdate({ ...selectedShape, fill: e.target.value })}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-300">Stroke Color</label>
        <input
          type="color"
          value={selectedShape.stroke || '#1e293b'}
          onChange={(e) => onUpdate({ ...selectedShape, stroke: e.target.value })}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
    </div>
  );
}

// ==================== MAIN APPLICATION ====================
export default function ModularDrawIOSystem() {
  const [projects, setProjects] = useState([{
    id: '1',
    name: 'My Project',
    diagrams: [{
      id: 'd1',
      name: 'Main Diagram',
      type: 'Class Diagram',
      shapes: [],
      connections: []
    }]
  }]);

  const [currentProjectId, setCurrentProjectId] = useState('1');
  const [currentDiagramId, setCurrentDiagramId] = useState('d1');
  const [selectedIds, setSelectedIds] = useState([]);
  const [clipboard, setClipboard] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState('select');
  const [showGrid, setShowGrid] = useState(true);
  const [isDrawingConnection, setIsDrawingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [connectionType, setConnectionType] = useState('association');
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);

  const [leftPanelWidth] = useState(280);
  const [rightPanelWidth] = useState(320);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(['Class Diagram', 'General']);
  const [showExamplesMenu, setShowExamplesMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stageRef = useRef();
  const containerRef = useRef();
  const [stageDimensions, setStageDimensions] = useState({ width: 1200, height: 800 });

  const currentProject = projects.find(p => p.id === currentProjectId);
  const currentDiagram = currentProject?.diagrams.find(d => d.id === currentDiagramId);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setStageDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [showLeftPanel, showRightPanel]);

  const addShape = useCallback((shapeType) => {
    const defaultSizes = {
      class: { width: 160, height: 160 },
      interface: { width: 160, height: 140 },
      abstractClass: { width: 160, height: 160 },
      enumeration: { width: 130, height: 130 },
      usecase: { width: 140, height: 80 },
      actor: { width: 60, height: 110 },
      systemBoundary: { width: 450, height: 350 },
      state: { width: 140, height: 80 },
      initialState: { width: 24, height: 24 },
      finalState: { width: 36, height: 36 },
      choiceState: { width: 40, height: 40 },
      action: { width: 160, height: 60 },
      decision: { width: 80, height: 80 },
      fork: { width: 120, height: 12 },
      join: { width: 120, height: 12 },
      initialNode: { width: 24, height: 24 },
      finalNode: { width: 36, height: 36 },
      lifeline: { width: 100, height: 350 },
      activation: { width: 20, height: 100 },
      component: { width: 160, height: 120 },
      artifact: { width: 130, height: 100 },
      node: { width: 160, height: 120 },
      package: { width: 170, height: 140 },
      note: { width: 140, height: 120 },
      frame: { width: 450, height: 350 }
    };

    const size = defaultSizes[shapeType] || { width: 120, height: 80 };

    const newShape = {
      id: `shape_${Date.now()}`,
      type: shapeType,
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      ...size,
      name: '',
      attributes: '',
      methods: '',
      operations: '',
      literals: '',
      activities: '',
      text: '',
      fill: '#ffffff',
      stroke: '#1e293b',
      strokeWidth: 2,
      rotation: 0
    };

    setProjects(prev => prev.map(p =>
      p.id === currentProjectId ? {
        ...p,
        diagrams: p.diagrams.map(d =>
          d.id === currentDiagramId ? {
            ...d,
            shapes: [...d.shapes, newShape]
          } : d
        )
      } : p
    ));

    setSelectedIds([newShape.id]);
  }, [currentProjectId, currentDiagramId]);

  const updateShape = useCallback((updatedShape) => {
    setProjects(prev => prev.map(p =>
      p.id === currentProjectId ? {
        ...p,
        diagrams: p.diagrams.map(d =>
          d.id === currentDiagramId ? {
            ...d,
            shapes: d.shapes.map(s => s.id === updatedShape.id ? updatedShape : s)
          } : d
        )
      } : p
    ));
  }, [currentProjectId, currentDiagramId]);

  const deleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;

    setProjects(prev => prev.map(p =>
      p.id === currentProjectId ? {
        ...p,
        diagrams: p.diagrams.map(d =>
          d.id === currentDiagramId ? {
            ...d,
            shapes: d.shapes.filter(s => !selectedIds.includes(s.id)),
            connections: d.connections.filter(c =>
              !selectedIds.includes(c.from) && !selectedIds.includes(c.to) && !selectedIds.includes(c.id)
            )
          } : d
        )
      } : p
    ));
    setSelectedIds([]);
  }, [currentProjectId, currentDiagramId, selectedIds]);

  const copySelected = useCallback(() => {
    const shapesToCopy = currentDiagram?.shapes.filter(s => selectedIds.includes(s.id));
    if (shapesToCopy && shapesToCopy.length > 0) {
      setClipboard(shapesToCopy);
    }
  }, [currentDiagram, selectedIds]);

  const pasteClipboard = useCallback(() => {
    if (clipboard.length === 0) return;

    const newShapes = clipboard.map(s => ({
      ...s,
      id: `shape_${Date.now()}_${Math.random()}`,
      x: s.x + 30,
      y: s.y + 30
    }));

    setProjects(prev => prev.map(p =>
      p.id === currentProjectId ? {
        ...p,
        diagrams: p.diagrams.map(d =>
          d.id === currentDiagramId ? {
            ...d,
            shapes: [...d.shapes, ...newShapes]
          } : d
        )
      } : p
    ));

    setSelectedIds(newShapes.map(s => s.id));
  }, [clipboard, currentProjectId, currentDiagramId]);

  const startConnection = useCallback((relType) => {
    setConnectionType(relType);
    setIsDrawingConnection(true);
    setTool('connection');
  }, []);

  const handleShapeClick = useCallback((shapeId) => {
    if (isDrawingConnection) {
      if (!connectionStart) {
        setConnectionStart(shapeId);
      } else if (connectionStart !== shapeId) {
        const relConfig = RELATIONSHIPS[connectionType];
        const newConnection = {
          id: `conn_${Date.now()}`,
          from: connectionStart,
          to: shapeId,
          type: connectionType,
          style: relConfig.style,
          endShape: relConfig.endShape
        };

        setProjects(prev => prev.map(p =>
          p.id === currentProjectId ? {
            ...p,
            diagrams: p.diagrams.map(d =>
              d.id === currentDiagramId ? {
                ...d,
                connections: [...(d.connections || []), newConnection]
              } : d
            )
          } : p
        ));

        setConnectionStart(null);
        setIsDrawingConnection(false);
        setTool('select');
      }
    } else if (tool === 'select') {
      setSelectedIds([shapeId]);
    }
  }, [isDrawingConnection, connectionStart, connectionType, currentProjectId, currentDiagramId, tool]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Delete') deleteSelected();
    if (e.key === 'Escape') {
      setIsDrawingConnection(false);
      setConnectionStart(null);
      setTool('select');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      copySelected();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.preventDefault();
      pasteClipboard();
    }
  }, [deleteSelected, copySelected, pasteClipboard]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleWheel = useCallback((e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const scaleBy = 1.08;

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const clampedScale = Math.max(0.1, Math.min(4, newScale));

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale
    };

    const newPos = {
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale
    };

    setZoom(clampedScale);
    setStagePos(newPos);
  }, []);

  const groupedShapes = Object.entries(UML_SHAPES).reduce((acc, [key, shape]) => {
    if (!acc[shape.category]) acc[shape.category] = [];
    acc[shape.category].push({ key, ...shape });
    return acc;
  }, {});

  const filteredShapes = Object.entries(groupedShapes).reduce((acc, [category, shapes]) => {
    const filtered = shapes.filter(shape =>
      shape.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  const selectedShape = currentDiagram?.shapes.find(s => selectedIds[0] === s.id);

  if (!currentDiagram) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Top Menu Bar */}
      <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-3 gap-1 text-xs">
        <div className="flex items-center gap-3">
          <button className="px-2 py-1 hover:bg-gray-700 rounded">File</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded">Edit</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded">Model</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded">Format</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded">View</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded">Tools</button>
        </div>

        <div className="ml-auto text-gray-400">
          {currentProject?.name} - {currentDiagram?.name}
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-3 gap-2">
        <button className="p-2 hover:bg-gray-700 rounded" title="New Project">
          <FileText size={18} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" title="Save">
          <Save size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button className="p-2 hover:bg-gray-700 rounded" title="Undo">
          <Undo size={18} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" title="Redo">
          <Redo size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button className="p-2 hover:bg-gray-700 rounded" title="Copy" onClick={copySelected}>
          <Copy size={18} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" title="Paste" onClick={pasteClipboard}>
          <ClipboardPaste size={18} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" title="Delete" onClick={deleteSelected}>
          <Trash2 size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button
          className={`p-2 hover:bg-gray-700 rounded ${tool === 'select' ? 'bg-gray-700 text-blue-400' : ''}`}
          onClick={() => setTool('select')}
          title="Select"
        >
          <Mouse size={18} />
        </button>
        <button
          className={`p-2 hover:bg-gray-700 rounded ${tool === 'pan' ? 'bg-gray-700 text-blue-400' : ''}`}
          onClick={() => setTool('pan')}
          title="Pan"
        >
          <Move size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button className="p-2 hover:bg-gray-700 rounded" onClick={() => setZoom(z => Math.min(4, z * 1.2))}>
          <ZoomIn size={18} />
        </button>
        <span className="text-sm px-2 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
        <button className="p-2 hover:bg-gray-700 rounded" onClick={() => setZoom(z => Math.max(0.1, z / 1.2))}>
          <ZoomOut size={18} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" onClick={() => { setZoom(1); setStagePos({ x: 0, y: 0 }); }}>
          <Maximize2 size={18} />
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button
          className={`p-2 hover:bg-gray-700 rounded ${showGrid ? 'bg-gray-700 text-blue-400' : ''}`}
          onClick={() => setShowGrid(!showGrid)}
        >
          <Grid size={18} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Toolbox */}
        {showLeftPanel && (
          <div className="bg-gray-800 border-r border-gray-700 overflow-y-auto" style={{ width: leftPanelWidth }}>
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Toolbox</h3>
                <button onClick={() => setShowLeftPanel(false)} className="p-1 hover:bg-gray-700 rounded">
                  <X size={14} />
                </button>
              </div>

              {/* Search */}
              <div className="mb-3 relative">
                <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shapes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded pl-8 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Shape Categories */}
              {Object.entries(filteredShapes).map(([category, shapes]) => (
                <div key={category} className="mb-2">
                  <button
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded text-sm font-medium"
                    onClick={() => setExpandedCategories(prev =>
                      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                    )}
                  >
                    <span>{category}</span>
                    {expandedCategories.includes(category) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  {expandedCategories.includes(category) && (
                    <div className="ml-2 space-y-1">
                      {shapes.map(shape => {
                        const IconComponent = shape.icon;
                        return (
                          <button
                            key={shape.key}
                            className="w-full flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-sm text-left transition-colors"
                            onClick={() => addShape(shape.type)}
                          >
                            <IconComponent size={16} className="text-gray-400" />
                            <span>{shape.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="font-semibold text-sm mb-2">Relationships</h4>
                {Object.entries(RELATIONSHIPS).map(([key, rel]) => (
                  <button
                    key={key}
                    className={`w-full flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-sm text-left transition-colors ${
                      isDrawingConnection && connectionType === rel.type ? 'bg-blue-600' : ''
                    }`}
                    onClick={() => startConnection(rel.type)}
                  >
                    <ArrowRightIcon size={16} className="text-gray-400" />
                    <span>{rel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Diagram Tabs */}
          <div className="h-10 bg-gray-850 border-b border-gray-700 flex items-center px-2 gap-1 overflow-x-auto">
            {currentProject?.diagrams.map(diagram => (
              <div key={diagram.id} className="flex items-center">
                <button
                  className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    diagram.id === currentDiagramId
                      ? 'bg-gray-900 text-white border-t-2 border-blue-500'
                      : 'bg-transparent text-gray-400 hover:bg-gray-800'
                  }`}
                  onClick={() => setCurrentDiagramId(diagram.id)}
                >
                  {diagram.name}
                </button>
              </div>
            ))}
            <button
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded"
              title="New Diagram"
              onClick={() => {
                const newDiagram = {
                  id: `d_${Date.now()}`,
                  name: `Diagram ${currentProject.diagrams.length + 1}`,
                  type: 'Class Diagram',
                  shapes: [],
                  connections: []
                };
                setProjects(prev => prev.map(p =>
                  p.id === currentProjectId ? {
                    ...p,
                    diagrams: [...p.diagrams, newDiagram]
                  } : p
                ));
                setCurrentDiagramId(newDiagram.id);
              }}
            >
              <Plus size={16} />
            </button>
          </div>

          <div ref={containerRef} className="flex-1 relative overflow-hidden bg-gray-950">
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(75, 85, 99, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(75, 85, 99, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: `${GRID_SIZE * zoom}px ${GRID_SIZE * zoom}px`,
                  backgroundPosition: `${stagePos.x}px ${stagePos.y}px`
                }}
              />
            )}

            <Stage
              ref={stageRef}
              width={stageDimensions.width}
              height={stageDimensions.height}
              scaleX={zoom}
              scaleY={zoom}
              x={stagePos.x}
              y={stagePos.y}
              onWheel={handleWheel}
              draggable={tool === 'pan'}
              onDragEnd={(e) => {
                if (tool === 'pan') {
                  setStagePos({ x: e.target.x(), y: e.target.y() });
                }
              }}
              onClick={(e) => {
                if (e.target === e.target.getStage()) {
                  setSelectedIds([]);
                }
              }}
            >
              <Layer>
                {/* Connections */}
                {currentDiagram.connections?.map(conn => (
                  <Connection
                    key={conn.id}
                    connection={conn}
                    shapes={currentDiagram.shapes}
                    isSelected={selectedIds.includes(conn.id)}
                    onSelect={() => setSelectedIds([conn.id])}
                    zoom={zoom}
                  />
                ))}

                {/* Shapes */}
                {currentDiagram.shapes.map(shape => (
                  <UniversalShape
                    key={shape.id}
                    shape={shape}
                    isSelected={selectedIds.includes(shape.id)}
                    onSelect={() => handleShapeClick(shape.id)}
                    onChange={updateShape}
                    zoom={zoom}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>

        {/* Right Panel - Properties */}
        {showRightPanel && (
          <div className="bg-gray-800 border-l border-gray-700 overflow-y-auto" style={{ width: rightPanelWidth }}>
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Properties</h3>
                <button onClick={() => setShowRightPanel(false)} className="p-1 hover:bg-gray-700 rounded">
                  <X size={14} />
                </button>
              </div>
              <PropertiesPanel
                selectedShape={selectedShape}
                onUpdate={updateShape}
              />
            </div>
          </div>
        )}
      </div>

      {/* Toggle Panel Buttons */}
      {!showLeftPanel && (
        <button
          onClick={() => setShowLeftPanel(true)}
          className="fixed left-0 top-1/2 bg-gray-800 p-2 rounded-r border-r border-t border-b border-gray-700"
        >
          <ChevronRight size={16} />
        </button>
      )}
      {!showRightPanel && (
        <button
          onClick={() => setShowRightPanel(true)}
          className="fixed right-0 top-1/2 bg-gray-800 p-2 rounded-l border-l border-t border-b border-gray-700"
        >
          <ChevronDown size={16} className="rotate-90" />
        </button>
      )}
    </div>
  );
}
