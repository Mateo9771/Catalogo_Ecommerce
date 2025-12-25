class AboutDTO {
  constructor(about) {
    this.id = about._id;
    this.title = about.title;
    this.description = about.description;
  }
}

export default AboutDTO;