import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  status: z.enum(['not started', 'in progress', 'completed']).default('not started'),
});
