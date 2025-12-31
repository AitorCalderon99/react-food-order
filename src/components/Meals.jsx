import { useEffect, useState } from 'react'
import MealItem from './MealItem.jsx'
import useHttp from '../hooks/useHttp.jsx'
import Error from './Error.jsx'

const requestConfig = {}

export default function Meals() {
  const {
    data: meals,
    loading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, [])

  if (loading) {
    return <p className="center">Loading meals...</p>
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {meals?.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  )
}
