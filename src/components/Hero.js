import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Hero() {
    return (
        <Wrapper className='section-center'>
            <article className="hero-text">
                <h1>
                    Your Ideal Online
                    Mobile Phone Store
                </h1>
                <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis lorem risus.</p>
                <Button as={Link} to="/products" size='lg'> Shop Now </Button>
            </article>
            <article className='img-container'>
                <img className="hero-img" id="img-1" src="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/596686-Product-0-I-637982215683748466_300x300.jpg?v=1662701000" />
                <img className="hero-img" id="img-2" src="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/598448-Product-0-I-637947050615176953_300x300.jpg?v=1664423566" />
            </article>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .img-container {
        display: block;
        position: relative;
        height: 65vh;
        width: 40vw;
    }
    .hero-img {
        padding: 10px 0;
        border-radius: 15px;
    }
    #img-1 {
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: 100;
    }
    #img-2 {
        position: absolute;
    }
}
`
