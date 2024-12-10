'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export interface MealForDb {
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

const isInvalidText = (text:string): boolean => !text || text.trim() === '';

interface ShareFormState {
  message: string;
}

export const shareMeal = async (_prevState: ShareFormState, formData: FormData) => {
  const meal: MealForDb = {
    title: formData.get('title') ? String(formData.get('title')) : '',
    summary: formData.get('summary') ? String(formData.get('summary')) : '',
    instructions: formData.get('instructions') ? String(formData.get('instructions')) : '',
    image: formData.get('image') as File,
    creator: formData.get('name') ? String(formData.get('name')) : '',
    creator_email: formData.get('email') ? String(formData.get('email')) : ''
  }

  if ((isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || meal.image.size === 0)) {
    return {
      message: 'Invalid input.'
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
};
