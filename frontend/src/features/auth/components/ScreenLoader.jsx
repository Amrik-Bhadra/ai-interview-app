import "../../../style/screen-loader.scss";

const ScreenLoader = ({ label = "Loading" }) => {
  return (
    <main className="screen-loader">
      <div className="loader-core">
        <span className="ring ring-1" />
        <span className="ring ring-2" />
        <span className="ring ring-3" />
        <span className="core-dot" />
      </div>

      <p className="loader-label">
        {label}
        <span className="loader-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </p>
    </main>
  );
};

export default ScreenLoader;