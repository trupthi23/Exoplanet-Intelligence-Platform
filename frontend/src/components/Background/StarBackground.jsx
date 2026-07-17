import "./StarBackground.css";

function StarBackground() {

  const stars = Array.from({ length: 220 });

  return (

    <div className="star-background">

      {stars.map((_, index) => {

        const size = Math.random() * 3 + 1;

        const top = Math.random() * 100;

        const left = Math.random() * 100;

        const duration = Math.random() * 6 + 3;

        const delay = Math.random() * 5;

        return (

          <span

            key={index}

            className="star"

            style={{

              width: size,

              height: size,

              top: `${top}%`,

              left: `${left}%`,

              animationDuration: `${duration}s`,

              animationDelay: `${delay}s`,

            }}

          />

        );

      })}

    </div>

  );

}

export default StarBackground;