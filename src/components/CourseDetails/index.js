import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const status = {
  initials: 'INITIALS',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class CourseDetails extends Component {
  state = {courseDetails: [], apiStatus: status.initials}

  componentDidMount() {
    this.courseDetails()
  }

  courseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: status.loading})
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.course_details
      const updatedData = {
        id: fetchedData.id,
        description: fetchedData.description,
        imageUrl: fetchedData.image_url,
        name: fetchedData.name,
      }
      this.setState({courseDetails: updatedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failed})
    }
  }

  retryAgain = () => this.courseDetails()

  failedResults = () => (
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

  loaderResults = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successResults = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="specific-container">
        <img src={imageUrl} alt={name} className="specific-image" />
        <div className="description-container">
          <h1 className="specific-name">{name}</h1>
          <p className="specific-description">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.successResults()

      case 'LOADING':
        return this.loaderResults()

      case 'FAILED':
        return this.failedResults()

      default:
        return null
    }
  }

  render() {
    const {courseDetails} = this.state
    console.log(courseDetails)
    return (
      <div>
        <Header />
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default CourseDetails
