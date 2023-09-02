import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { select, line, path } from "d3";
import "./Mst.css";

const Mst = () => {
  const svgRef = useRef(null);
  const pathArrayRef = useRef([]);
  const [data, setData] = useState([]);

  const union = (a, b) => {
    const A = find(a),
      B = find(b);
    if (A === B) {
      return 0;
    }
    if (A.rank >= B.rank) {
      B.par = A;
      if (A.rank === B.rank) {
        A.rank++;
      }
    } else {
      A.par = B;
    }

    return 1;
  };

  const find = (a) => {
    if (a.par === null) {
      return a;
    }

    return (a.par = find(a.par));
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    for (let i = data.length - 1; i >= 0; i--) {
      data[i].par = null;
      data[i].rank = 0;
    }

    const circles = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 10)
      .attr("cx", (val) => val.x)
      .attr("cy", (val) => val.y);

    circles.on("click", (val, d) => {
      pathArrayRef.current = pathArrayRef.current.filter(
        (item) => val !== item[0] && val !== item[1]
      );
      setData((data) => [...data.filter((item) => item !== val)]);
    });

    console.log(data);
    console.log(pathArrayRef.current);
    let count = data.length - 1;
    const links = [];
    const len = pathArrayRef.current.length;
    for (let i = 0; i < len && count > 0; i++) {
      const a = pathArrayRef.current[i][0],
        b = pathArrayRef.current[i][1];
      if (union(a, b) === 1) {
        count--;
        links.push(pathArrayRef.current[i]);
      }
    }

    const myLine = line()
      .x((d) => d.x)
      .y((d) => d.y);

    const paths = svg
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", (val) => myLine(val))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  const clickHandler = (e) => {
    console.log(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = parseInt(e.nativeEvent.clientX - rect.left),
      y = parseInt(e.nativeEvent.clientY - rect.top);
    console.log(e.nativeEvent.clientX, e.nativeEvent.clientY);
    console.log(x, y);
    const point = {
      x: x,
      y: y,
      par: null,
      rank: 0,
    };

    data.forEach((item) => {
      const arr = pathArrayRef.current;
      arr.push([point, item]);
    });

    pathArrayRef.current.sort((a, b) => {
      const dist1 =
        (a[0].x - a[1].x) * (a[0].x - a[1].x) +
        (a[0].y - a[1].y) * (a[0].y - a[1].y);
      const dist2 =
        (b[0].x - b[1].x) * (b[0].x - b[1].x) +
        (b[0].y - b[1].y) * (b[0].y - b[1].y);

      if (dist1 < dist2) {
        return -1;
      } else if (dist1 === dist2) {
        return 0;
      }

      return 1;
    });

    setData((data) => [...data, point]);
  };

  return (
    <Box height={"93vh"} width={"100%"}>
      <svg className="svg" ref={svgRef} onClick={clickHandler}></svg>
    </Box>
  );
};

export default Mst;
