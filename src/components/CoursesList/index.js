import {Link} from 'react-router-dom'
import './index.css'

const CoursesList = props => {
  const {eachCourseDetails} = props
  const {name, logoUrl, id} = eachCourseDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list-items">
        <img src={logoUrl} alt={name} className="image" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CoursesList
