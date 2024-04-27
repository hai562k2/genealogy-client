import React, { Component, RefObject } from "react";
import FamilyTree from "@balkangraph/familytree.js";

interface Node {
  id: number;
  pids?: number[];
  mid?: number;
  fid?: number;
  name: string;
  gender: string;
  img?: string[];
  des?: string;
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
    if (this.divRef.current) {
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

  render() {
    return <div ref={this.divRef}></div>;
  }
}
