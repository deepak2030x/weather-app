function Header() {
  const headStyle = { textAlign: "center" };
  const fontStyle = { fontSize: `${30}px` };
  return (
    <div style={headStyle}>
      <header>
        <h1>Welcome to Weather Application</h1>
      </header>
      <ul>
        <p style={fontStyle}>
          Enter a location in a search box to see "weather" of that location.
        </p>
        <h2>
          Note: Make sure you enter correct location name. For incorrect
          location name, it shows city not found.
        </h2>
        <p style={fontStyle}>For Ex: Enter Bangalore instead of Bengaluru</p>
      </ul>
    </div>
  );
}

export default Header;
