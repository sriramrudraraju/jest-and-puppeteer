import * as React from "react";

class Api extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      error: false
    };
  }

  public async componentDidMount() {
    this.setState({
      loading: true,
      data: null,
      error: null
    });
    try {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon/150/");
      const json = await data.json();
      this.setState({
        data: json,
        error: null
      })
    } catch (error) {
      this.setState({
        data: null,
        error
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  public render() {
    const {loading, data, error} = this.state
    return (
      <div>
        <h2>Api Example</h2>
        <div className="pokemon">
          {loading ? 'Loading data ...' : null}
          {error ? 'Ooops..': null}
          {data ? `Name: ${data.name} Id: ${data.id}`: null}
        </div>
      </div>
    );
  }
}

export default Api;
