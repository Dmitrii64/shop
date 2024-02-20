import React from "react"
import ContentLoader from "react-content-loader"
import styles from './Skeleton.module.scss';

const Skeleton = () => (
  <ContentLoader
    className={styles.Skeleton}
    speed={2}
    width={273}
    height={608}
    viewBox="0 0 273 608"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="273" height="370" />
    <rect x="165" y="237" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="380" rx="10" ry="10" width="273" height="25" />
    <rect x="0" y="440" rx="10" ry="10" width="273" height="110" />
    <rect x="0" y="570" rx="10" ry="10" width="80" height="30" />
    <rect x="156" y="570" rx="10" ry="10" width="115" height="30" />
  </ContentLoader>
)

export default Skeleton