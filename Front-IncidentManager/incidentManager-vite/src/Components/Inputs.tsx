interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}
export function Inputs(props: Props){
    return(
        <input
        className="Input-field"
        autoComplete="off"
        {...props}
      />
    );
}
export default Inputs