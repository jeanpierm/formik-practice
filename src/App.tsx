import SignupForm from './components/SignupForm';

function App(): JSX.Element {
  // const user: { [key: string]: string } = {
  //   name: " Jeanpier   ",
  //   username: "jeanpierm",
  //   email: "jeanpi3rm@gmail.com",
  //   password: "1234",
  // };

  // const removeSpaces = (str: string) => str.replace(/\s/g, "");

  return (
    <>
      {/* <div>
        <h2>facebook</h2>
        <h4>Recent Logins</h4>
        <p>Click your picture or add an account.</p>
      </div>
      <div>
        <form>
          <div>
            <input type="text" name="username" />
          </div>
          <div>
            <input type="password" name="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>Create a Page for a celebrity, brand or business.</p>
      </div> */}
      <SignupForm />
    </>
  );
}

export default App;
