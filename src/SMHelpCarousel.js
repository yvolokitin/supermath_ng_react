import React from 'react';

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';

class SMHelpCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.onSMCarouselClicked = this.onSMCarouselClicked.bind(this);
  };

  onSMCarouselClicked() {
    this.setState({  });
  };

  render() {
    return (
      <div>
       <AutoRotatingCarousel
         label="Get started"
         open
       >
       <Slide
          media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" alt="youtube icon"/>}
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          contentStyle={{ backgroundColor: red[600] }}
          title="This is a very cool feature"
          subtitle="Just using this will blow your mind."
        />
        <Slide
          media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" alt="google icon"/>}
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          contentStyle={{ backgroundColor: blue[600] }}
          title="Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={<img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" alt="google icon"/>}
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          contentStyle={{ backgroundColor: green[600] }}
          title="May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars universe."
        />
      </AutoRotatingCarousel>
    </div>
    )
  }
};

export default SMHelpCarousel;
