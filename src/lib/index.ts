import { z } from 'zod';

export const expenseSchema = z.object({
	name: z.string().min(2, { message: 'Name should be atleast 2 characters' }),
	price: z.coerce.number().min(1, { message: 'Price cannot be less than 1' }),
	quantity: z.string().min(1, { message: 'Quantity is required' }),
	comments: z.string().optional().default(''),
	categoryId: z.string()
});

export type ExpenseSchema = typeof expenseSchema;

export const itemSchema = z.object({
	categoryId: z.string().uuid(),
	name: z.string().min(2, { message: 'Name should be atleast 2 characters' })
});

export type ItemSchema = typeof itemSchema;
