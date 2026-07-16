import './Home.css';
import { SecondaryNav } from '../components/dashboard/layout/secondary-nav';

function Home() {
  return (
    <div id="page-top">
      <SecondaryNav />

      <header className="masthead text-center text-white">
        <div className="masthead-content">
          <div className="container px-5">
            <h1 className="masthead-subheading mb-0">Welcome to</h1>
            <h1 className="masthead-heading mb-0">IntelliSight</h1>
            <a className="btn btn-primary btn-xl rounded-pill mt-5" href="/register">Jump In</a>
            <p style={{ position: 'relative', bottom: '-7rem' }}>Brought to you by Frank Velazquez.</p>
          </div>
        </div>
        <div className="bg-circle-1 bg-circle"></div>
        <div className="bg-circle-2 bg-circle"></div>
        <div className="bg-circle-3 bg-circle"></div>
        <div className="bg-circle-4 bg-circle"></div>
      </header>

      <section id="scroll">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded"
                  src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2019%2F08%2Fdua-lipa-ysl-beauty-fragrance-campaign-libre-perfume-1.jpg?cbr=1&q=90"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4">Ready?</h2>
                <p style={{ fontSize: '1.2rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit
                  iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum
                  molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid rounded"
                  src="https://static.vecteezy.com/system/resources/previews/023/902/272/non_2x/beautiful-young-woman-with-bottle-of-perfume-illustration-ai-generative-free-photo.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <h2 className="display-4">Set...</h2>
                <p style={{ fontSize: '1.2rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit
                  iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum
                  molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded"
                  src="https://mediaslide-europe.storage.googleapis.com/metropolitan/pictures/4109/5393/large-1469791303-073a4ea6005d4d8f1d6d7f6683863dad.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4">Shop!</h2>
                <p style={{ fontSize: '1.2rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit
                  iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum
                  molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-5 bg-black">
        <div className="container px-5">
          <p className="m-0 text-center text-white small">Copyright &copy; Lostborn 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
