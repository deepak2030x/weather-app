const fontStyle = {
  fontSize: `${25}px`,
  textAlign: "center",
  marginTop: `${20}px`,
};

function Footer() {
  return (
    <>
      <footer style={fontStyle}>
        Coded by
        <a
          href="https://linkedin.com/in/deepak2030x/"
          target="_blank"
          rel="noreferrer"
        >
          Deepak
        </a>
      </footer>
    </>
  );
}

export default Footer;
