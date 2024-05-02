import React, { Component, RefObject } from "react";
import FamilyTree from "@balkangraph/familytree.js";

interface Node {
  id?: number;
  pids?: number[];
  mid?: number;
  fid?: number;
  name?: string;
  gender?: string;
  img?: string[];
  birthday?: Date;
  lunarBirthday?: Date;
  country?: string;
  phone?: string;
  job?: string;
  workAddress?: string;
  description?: string;
  deadDay?: Date;
  lunarDeadDay?: Date;
}

interface Props {
  nodes: Node[];
}

export default class MyFamilyTree extends Component<Props> {
  private divRef: RefObject<HTMLDivElement>;
  private family?: FamilyTree;

  constructor(props: Props) {
    super(props);
    this.divRef = React.createRef();
  }

  componentDidMount() {
    this.renderFamilyTree();
  }

  componentDidUpdate(prevProps: Props) {
    // Check if nodes prop has changed
    if (prevProps.nodes !== this.props.nodes) {
      this.renderFamilyTree();
    }
  }

  renderFamilyTree() {
    if (this.divRef.current) {
      // If family tree already exists, destroy it first
      // if (this.family) {
      //   this.family.destroy();
      // }

      // Render the family tree with updated nodes
      this.family = new FamilyTree(this.divRef.current, {
        nodes: this.props.nodes,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
        editForm: {
          buttons: {
            edit: null,
          },
        },
      });
    }
  }

  componentWillUnmount() {
    // Cleanup when component is unmounted
    if (this.family) {
      this.family.destroy();
    }
  }

  render() {
    return <div ref={this.divRef}></div>;
  }
}
