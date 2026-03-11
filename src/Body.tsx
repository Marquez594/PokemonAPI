import poke from "../public/poke.png";

function Body() {
  return (
    <div className="border flex-1 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-10 p-2">
        {/**Main Div */}
        <div className="flex items-center md:gap-10 gap-5">
          {/**Title */}
          <img src={poke} className="md:h-32 md:w-32 h-16 w-16" alt="Pokemon logo"></img>
          <h1 className="lg:text-8xl md:text-6xl text-3xl text-center">Pokemon Search</h1>
        </div>
        <div className="w-1/2">
          <p className="text-center">
            Look up your favorite pokemon and check their stats. You can also
            check their moves which allows you to come up with your best
            stragety for your needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Body;
