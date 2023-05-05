import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

import PasswordItem from '../PasswordItem'

const colorsList = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
  'slate-blue',
  'Mauve-taupe',
  'slate-blue',
]

class PasswordManager extends Component {
  state = {
    password: '',
    website: '',
    username: '',
    currentList: [],
    checkedStatus: false,
    searchInput: '',
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onChangeUserNameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeSearchInput = event => {
    const filteredInput = event.target.value.toLowerCase()
    this.setState({searchInput: filteredInput})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {website, password, username} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const randomColor =
        colorsList[Math.floor(Math.random() * colorsList.length)]
      const newItem = {
        id: v4(),
        websiteInput: website,
        userNameInput: username,
        passwordInput: password,
        randomColorInput: randomColor,
      }
      this.setState(prevState => ({
        currentList: [...prevState.currentList, newItem],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onChangingCheckBoxInput = event => {
    const checkBoxStatus = event.target.checked
    if (checkBoxStatus) {
      this.setState({checkedStatus: true})
    } else {
      this.setState({checkedStatus: false})
    }
  }

  renderNopasswordsView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-passwords-img"
        alt="no passwords"
      />
      <p className="no-passwords-txt">No Passwords</p>
    </div>
  )

  renderPasswordsView = () => {
    const {checkedStatus, currentList, searchInput} = this.state
    const searchResults = currentList.filter(eachInput =>
      eachInput.websiteInput.toLowerCase().includes(searchInput),
    )
    return (
      <ul className="ul-container">
        {searchResults.map(eachItem => (
          <PasswordItem
            eachItem={eachItem}
            checkedStatus={checkedStatus}
            getUpdatedList={this.getUpdatedList}
            key={eachItem.id}
          />
        ))}
      </ul>
    )
  }

  getUpdatedList = id => {
    const {currentList} = this.state
    const updatedList = currentList.filter(eachItem => eachItem.id !== id)
    this.setState({currentList: updatedList})
  }

  render() {
    const {
      currentList,
      searchInput,
      checkedStatus,
      website,
      username,
      password,
    } = this.state

    const currentPasswordsListCount = currentList.length

    const searchResults = currentList.filter(eachInput =>
      eachInput.websiteInput.toLowerCase().includes(searchInput),
    )
    const currentListCount = currentList.length
    const searchResultsCount = searchResults.length
    const renderPasswordAndNoPasswordView =
      currentListCount === 0 || searchResultsCount === 0

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="password-input-img-container">
          <div className="password-input-container">
            <h1 className="add-password-heading">Add New Password</h1>
            <form className="form-container" onSubmit={this.onAddNewPassword}>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="wup-img"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={website}
                />
              </div>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="wup-img"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserNameInput}
                  value={username}
                />
              </div>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="wup-img"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={password}
                />
              </div>
              <div className="add-button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-img"
            alt="password manager"
          />
        </div>
        <div className="your-passwords-container">
          <div className="heading-search-input-container">
            <div className="password-heading-count-container">
              <h1 className="your-passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{currentPasswordsListCount}</p>
            </div>
            <div className="input-container">
              <div className="search-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="search-icon"
                  alt="search"
                />
              </div>
              <input
                type="search"
                className="search-input-element"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-text-container">
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox-input"
              onChange={this.onChangingCheckBoxInput}
              value={checkedStatus}
            />
            <label htmlFor="checkbox" className="show-passwords-txt">
              Show Passwords
            </label>
          </div>
          {renderPasswordAndNoPasswordView
            ? this.renderNopasswordsView()
            : this.renderPasswordsView()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
