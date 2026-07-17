import "./StarBackground.css";

function StarBackground() {

  const stars = Array.from(
    { length: 250 },
    (_, index) => {

      return {

        id: index,

        top: Math.random() * 100,

        left: Math.random() * 100,

        size: Math.random() * 3 + 1,

        delay: Math.random() * 5,

        duration: 2 + Math.random() * 5,

      };

    }
  );

  return (

    <div className="stars">

      {stars.map((star) => (

        <span
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />

      ))}

    </div>

  );

}

export default StarBackground;