'use client';

import { useFormStatus } from "react-dom";

export const MealsFormSubmit = (): JSX.Element => {
  const { pending } = useFormStatus();

  return (
  <button disabled={pending}>
    {pending ? 'Submitting...' : 'Share Meal'}
  </button>
  )
}