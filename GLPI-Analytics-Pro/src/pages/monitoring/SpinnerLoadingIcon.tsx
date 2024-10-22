export function SpinnerLoadinIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
        .spinner {
          transform-origin: center;
          animation: spinnerRotate .75s infinite linear;
        }
        @keyframes spinnerRotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}
      </style>
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner"
      />
    </svg>
  )
}

export function CircleLoadingIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
      .spinner_b2T7 {
        animation: spinner_xe7Q 0.8s linear infinite;
      }
      .spinner_YRVV {
        animation-delay: -0.65s;
      }
      .spinner_c9oY {
        animation-delay: -0.5s;
      }
      @keyframes spinner_xe7Q {
        93.75%, 100% {
          r: 3px;
        }
        46.875% {
          r: 0.2px;
        }
      }
    `}
      </style>
      <circle className="spinner_b2T7" cx="4" cy="12" r="3" />
      <circle className="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3" />
      <circle className="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3" />
    </svg>
  )
}
