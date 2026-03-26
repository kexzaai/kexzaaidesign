'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  initialTasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

const COLUMNS: TaskStatus[] = ['Pending', 'In-Progress', 'Completed'];

export default function TaskBoard({ initialTasks, onTaskStatusChange }: TaskBoardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setIsMounted(true);
    setTasks(initialTasks);
  }, [initialTasks]);

  if (!isMounted) return null;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    
    // Optimistic UI update
    const newTasks = Array.from(tasks);
    const taskIndex = newTasks.findIndex(t => t.id === draggableId);
    if (taskIndex > -1) {
      newTasks[taskIndex].status = newStatus;
      setTasks(newTasks);
    }
    
    onTaskStatusChange(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-8">
        {COLUMNS.map((columnId) => {
          const columnTasks = tasks.filter(task => task.status === columnId);
          
          return (
            <div key={columnId} className="flex flex-col h-full bg-white/5 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500/50 to-purple-500/50" />
              
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-semibold text-white/90">{columnId}</h2>
                <span className="bg-white/10 text-white/70 text-xs font-bold px-2.5 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 transition-colors rounded-xl p-2 min-h-[500px] ${
                      snapshot.isDraggingOver ? 'bg-white/5 border border-dashed border-violet-500/30' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.9 : 1,
                              }}
                            >
                              <TaskCard task={task} isOverdue={new Date(task.deadline) < new Date() && task.status !== 'Completed'} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
