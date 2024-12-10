import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { v4 as uuidv4 } from 'uuid';

import { Meal } from '@/components/Meals/MealsGrid';
import { MealForDb } from './action';

const db = sql('meals.db');

export const getMeals = async (): Promise<Meal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare('SELECT* FROM meals').all() as Meal[];
}

export const getMeal = async (slug: string): Promise<Meal> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal;
}

export const saveMeal = async (meal: MealForDb) => {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);
 
  const extension = meal.image.name.split('.').pop();
  const fileName = `${slug}-${uuidv4()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage: ArrayBuffer = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed');
    }
  });

  const mealForDb = {
    ...meal,
    image: `/images/${fileName}`,
    slug,
    instructions,
  };

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `).run(mealForDb);
}
