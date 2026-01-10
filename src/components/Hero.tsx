
import CharacterWalker from './CharacterWalker'

export default function Hero({ onFinish }: { onFinish: () => void }) {
  return (
    <section className="section hero">
      <div className="container">
        <div className="hero-inner">
          <CharacterWalker
            nameText="Antonia Casariego Oronoz"
            nameSize={72}
            railYPercent={62}
            speed={700}
            height={Math.max(520, window.innerHeight)}
            idleSrc="/characters/idle.png"
            walkSrc="/characters/walk.png"
            onFinish={onFinish}
          />

          <p className="hero-subtitle">
            Product developer at the intersection of engineering and design
            
          </p>
          <p className="hero-blurb">
            Currently studying Computer Science and Visual Arts at Columbia University. Based in New York City. 
            
          </p>
        </div>
      </div>
    </section>
  )
}
