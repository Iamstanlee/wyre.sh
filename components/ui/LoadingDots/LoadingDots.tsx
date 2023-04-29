import style from './LoadingDots.module.css';

interface Props {
  fullScreen?: boolean;
}

const LoadingDots = ({ fullScreen }: Props) => {
  return (
    <div
      className={
        fullScreen
          ? 'min-h-screen w-full flex justify-center items-center'
          : 'min-h-screen w-full flex justify-center items-center main-wrapper'
      }
    >
      <span className={style.root}>
        <span />
        <span />
        <span />
      </span>
    </div>
  );
};

export default LoadingDots;
