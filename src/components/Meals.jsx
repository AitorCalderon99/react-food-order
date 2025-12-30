import { useEffect, useState } from 'react'

export default function Meals() {
  const [meals, setMeals] = useState([])
  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch('http://localhost:3000/meals')

        if (!response.ok) {
          throw new Error('Error fetch')
        }

        const data = await response.json()
        setMeals(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchMeals()
  }, [])

  return (
    <ul id="meals">
      {meals?.map((meal) => (
        <li id={meal.id} key={meal.id}>
          {meal.name}
        </li>
      ))}
    </ul>
  )
}
