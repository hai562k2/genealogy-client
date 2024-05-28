import React, { Component, RefObject } from "react";
import FamilyTree from "@balkangraph/familytree.js";

interface Node {
  id: number;
  pids: number[] | [];
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

  shouldComponentUpdate() {
    return true;
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

  exportPDF() {
    if (this.family) {
      this.family.exportPDF();
    }
  }

  exportPNG() {
    if (this.family) {
      this.family.exportPNG();
    }
  }

  exportSVG() {
    if (this.family) {
      this.family.exportSVG();
    }
  }

  renderFamilyTree() {
    if (this.divRef.current) {
      // If family tree already exists, destroy it first
      // if (this.family) {
      //   this.family.destroy();
      // }

      // Render the family tree with updated nodes
      FamilyTree.SEARCH_PLACEHOLDER = "Tìm kiếm theo tên";
      this.family = new FamilyTree(this.divRef.current, {
        nodes: this.props.nodes,
        template: "hugo",
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
        menu: {
          export_pdf: {
            text: "Export PDF",
            icon: FamilyTree.icon.pdf(24, 24, "#FF0000"),
            onClick: this.exportPDF.bind(this), // Kích hoạt hàm exportPDF khi người dùng nhấp vào nút "Export PDF"
          },
          export_png: {
            text: "Export PNG",
            icon: FamilyTree.icon.png(24, 24, "#00ff00"),
            onClick: this.exportPNG.bind(this), // Kích hoạt hàm exportPNG khi người dùng nhấp vào nút "Export PNG"
          },
          export_svg: {
            text: "Export SVG",
            icon: FamilyTree.icon.svg(24, 24, "#0000ff"),
            onClick: this.exportSVG.bind(this), // Kích hoạt hàm exportSVG khi người dùng nhấp vào nút "Export SVG"
          },
        },
        nodeMenu: {
          export_pdf: {
            text: "Export PDF",
            icon: FamilyTree.icon.pdf(24, 24, "#FF0000"),
            onClick: this.exportPDF.bind(this), // Kích hoạt hàm exportPDF khi người dùng nhấp vào mục "Export PDF" của nodeMenu
          },
          export_png: {
            text: "Export PNG",
            icon: FamilyTree.icon.png(24, 24, "#00ff00"),
            onClick: this.exportPNG.bind(this), // Kích hoạt hàm exportPNG khi người dùng nhấp vào nút "Export PNG"
          },
          export_svg: {
            text: "Export SVG",
            icon: FamilyTree.icon.svg(24, 24, "#0000ff"),
            onClick: this.exportSVG.bind(this), // Kích hoạt hàm exportSVG khi người dùng nhấp vào nút "Export SVG"
          },
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
