import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import CoursesList from '../CoursesList'

const status = {
  initials: 'INITIALS',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: status.initials}

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({apiStatus: status.loading})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({coursesList: updatedList, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failed})
    }
  }

  retryAgain = () => this.getCoursesDetails()

  getFailedResults = () => (
    <div className="failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failed-image"
      />
      <h1 className="failed-heading">Oops! Something Went Wrong</h1>
      <p className="failed-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.retryAgain}>
        Retry
      </button>
    </div>
  )

  getLoaderResults = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successfulResults = () => {
    const {coursesList} = this.state

    return (
      <ul className="unordered-list-container">
        {coursesList.map(eachCourse => (
          <CoursesList eachCourseDetails={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.successfulResults()

      case 'LOADING':
        return this.getLoaderResults()

      case 'FAILED':
        return this.getFailedResults()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1 className="main-heading">Courses</h1>
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default Home
