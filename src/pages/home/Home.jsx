import Grid from "../../components/layout/Grid";
import Column from "../../components/layout/Column";
import Qualifications from "./Qualifications";
import Education from "./Education";
import Experience from "./Experience";

export default function Home(props) {
  return (
    <Grid>
      <Column>
        <Qualifications />
      </Column>
      <Column>
        <Education />
        <Experience />
      </Column>
    </Grid>
  );
}