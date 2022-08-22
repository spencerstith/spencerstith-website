import Box from "../../components/Box";
import { TagDanger } from "../../components/Tag";

export default function Qualifications() {
  return (
    <>
      <Box title="Computer Science Qualifications">
        <div className="content">
          <ul>
            <li>
              Object Oriented Programming
              <TagDanger>Java (3+years)</TagDanger>
              <TagDanger>Python</TagDanger>
              <TagDanger>JavaScript</TagDanger>
              <TagDanger>Swift</TagDanger>
              <TagDanger>C#</TagDanger>
            </li>
            <li>Data Structures, Algorithms, and Problem Solving</li>
            <li>Cyber Security, Encryption, Secure Electronic Commerce, System Administration</li>
            <li>Computer Architecture, Multi-threading, Low-level Systems</li>
            <li>Mathematical & Statistical Analysis</li>
            <li>Dynamic Programming and Scalability</li>
            <li>
              Large Project Management and Team-Oriented Projects
              <TagDanger>Communication</TagDanger>
              <TagDanger>Organization</TagDanger>
              <TagDanger>Git/GitHub</TagDanger>
            </li>
            <li>
              Database Design, Relational Databases, Query Optimization
              <TagDanger>MySQL</TagDanger>
            </li>
          </ul>
        </div>
      </Box>
      <Box title="Mathematics Qualifications">
        <div className="content">
          <ul>
            <li>Calculus I - III, Differential Equations, Real Analysis (Advanced Calculus)</li>
            <li>Physics I - III</li>
            <li>Statistical Methods, Discrete Mathematics</li>
            <li>Abstract Algebra, Number Theory, Set Theory</li>
            <li>Linear Algebra & Matrix Theory</li>
          </ul>
        </div>
      </Box>
    </>
  );
}