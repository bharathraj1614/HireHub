function Spinner() {
  return (
    <div className="z-20 absolute inset-0 flex items-center justify-center bg-slate-200/10 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
