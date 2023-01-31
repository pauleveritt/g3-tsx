// @ts-ignore
import { h } from "nano-jsx"
export type FooterProps = {
  copyright: string;
};
const Footer = ({ copyright }: FooterProps) => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4 has-text-centered">
            <p
              class="is-size-6"
              dangerouslySetInnerHTML={{ __html: copyright }}
            ></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
