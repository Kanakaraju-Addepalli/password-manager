import './index.css'

const PasswordItem = props => {
  const {eachItem, getUpdatedList, checkedStatus} = props
  const {
    id,
    websiteInput,
    userNameInput,
    passwordInput,
    randomColorInput,
  } = eachItem
  const firstLetter = websiteInput[0]
  const onClickDeleteIcon = () => {
    getUpdatedList(id)
  }
  let passwordElement
  if (checkedStatus) {
    passwordElement = <p className="user-password">{passwordInput}</p>
  } else {
    passwordElement = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        className="stars"
        alt="stars"
      />
    )
  }
  return (
    <li className="item-container">
      <div className="first-letter-password-container">
        <div className={`first-letter ${randomColorInput}`}>{firstLetter}</div>
        <div className="password-container">
          <p className="website-name">{websiteInput}</p>
          <p className="user-name">{userNameInput}</p>
          {passwordElement}
        </div>
      </div>
      <button
        data-testid="delete"
        type="button"
        className="delete-icon-container"
        onClick={onClickDeleteIcon}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
