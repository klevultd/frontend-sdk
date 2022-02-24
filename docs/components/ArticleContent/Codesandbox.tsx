export default function Codesandbox(props: {
  sandboxId: string
  options: object
}) {
  let params = ""
  Object.entries(props.options).forEach(([key, value]) => {
    params += "&" + key + "=" + value
  })

  return (
    <iframe
      src={`https://codesandbox.io/embed/${props.sandboxId}?${params.substring(
        1
      )}`}
      style={{
        width: "100%",
        height: "500px",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
