import Box from "../../components/Box";
import { TagDanger } from "../../components/Tag";

export default function Experience() {
  return (
    <Box title="Experience">
      <div className="content">
        <p className="title is-4">
          TinySet
          <TagDanger>Self-Made</TagDanger>
          <TagDanger>Java</TagDanger>
          <TagDanger>Maven</TagDanger>
        </p>
        <p className="subtitle is-6">TinySet is a wrapper of the Java Database Connector (JDBC)</p>
        <ul>
          <li>Designed to greatly simplify database operations in Java by reducing boilerplate code and exception handling</li>
          <li>Uses Prepared Statements for optimal security</li>
          <li>Skills Strengthened: Database Security, Singleton Design Paradigm, Version Control, Build & Deployment Systems</li>
          <li>Is officially part of the Maven Central Repository</li>
        </ul>

        <p className="title is-4">
          Processing & P5.js
          <TagDanger>Open-Source Contributions</TagDanger>
          <TagDanger>JavaScript</TagDanger>
        </p>
        <p>
          I have used Processing and its sister project, P5.js, to create several visual art projects, shown on this website (several are here but there are more on my GitHub).
          I have contributed code multiple times to these open-source repositories.
          A goal of these projects is to create more inclusive environments around code and bring education to those in unfortunate circumstances.
        </p>

        <p className="title is-4">
          Personal Portfolio/Website
          <TagDanger>Self-Made</TagDanger>
          <TagDanger>JS</TagDanger>
          <TagDanger>Node</TagDanger>
          <TagDanger>React SPA</TagDanger>
          <TagDanger>Bulma</TagDanger>
        </p>
        <ul>
          <li>Created to showcase my abilities and generative art</li>
          <li>Follows web design paradigms (RESTful, front-end & back-end communication)</li>
          <li>Uses JavaScript, Node, Express, jQuery, Bulma</li>
        </ul>
      </div>
    </Box>
  );
}