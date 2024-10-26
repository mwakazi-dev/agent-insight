import styles from "./page.module.css";
import { Button } from "antd";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </div>
  );
}
