import React from "react";

class Hello extends React.PureComponent {
	constructor(name) {
		this.name = name;
	}

	componentDidMount() {
		console.log("start");
	}

	componentWillUnmount() {
		console.log("end");
	}
}
