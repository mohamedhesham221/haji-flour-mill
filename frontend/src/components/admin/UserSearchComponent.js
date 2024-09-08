import "./UserSearchComponent.css";

const UserSearchComponent = ({ title = "", usernameRef, isLoading, buttonText, handleSubmit }) => {

  return (
    <div className="user-search-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="user-search-form">
        <input
          type="text"
          placeholder="Enter username"
          ref={usernameRef}
          className="username-input"
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>{isLoading ? `Getting ${buttonText}...` : `Get ${buttonText}`}</button>
      </form>
    </div>
  );
};

export default UserSearchComponent;