import * as preact from 'preact';
import linkState from 'linkstate';
import * as api from './api';

interface State {
  query: string,
  gifUrl: string
  loading: boolean
}

export default class App extends preact.Component<{}, State> {
  state = {
    query: '',
    gifUrl: '',
    loading: false,
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();

    this.setState({loading: true});

    api.fetchGif(this.state.query)
      .then(gifUrl => this.setState({
        gifUrl,
        loading: false
      }));
  }

  renderImage() {
    const {loading, gifUrl} = this.state;

    if (!loading && !gifUrl) {
      return '(:';
    } else if (loading) {
      return 'Searching...';
    } else {
      return <img src={gifUrl} alt="gif" />;
    }
  }

  render({}, {loading, gifUrl}: State) {
    return (
      <div>
        <h1>Search for gifs!</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Search..."
            onInput={linkState(this, 'query')}
          />

          <button onClick={this.handleSubmit}>
            {'Go!'}
          </button>
        </form>

        <div>{this.renderImage()}</div>
      </div>
    );
  }
}
