module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        ssr: true, // SSR을 위한 설정
        displayName: true, // 클래스명에 컴포넌트 이름을 붙임
        pure: true, // dead code elimination (사용되지 않는 속성 제거)
      },
    ],
    ["inline-react-svg"],
  ],
};
