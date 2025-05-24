import { useEffect, useState } from 'react';
import './Mood.css'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const colors = {
  'Energetic': '#08A66B',
  'Happy': '#FDAA43',
  'Chill': '#6DD3CE',
  'Sad': '#4A6FA5',
  'Dance-able': '#9D4EDD',
  'Aggressive': '#B00020',
  'Romantic': '#FF6B81',
  'Ambient': '#C084FC'
}

function Mood(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData({
      name: props.mood,
      value: props.value
    })
  }, [location.search])

  return (
    <>
      <p className='mood'>{props.mood}:</p>
      <ResponsiveContainer width="100%" height="5%">
        <BarChart layout="vertical" data={data} >
          <XAxis type="number" domain={[0, 50]}  hide/>
          <YAxis type="category" dataKey="name" hide />
          <Tooltip />
          <Bar dataKey="value" fill={colors[props.mood]} barSize={40} radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default Mood;