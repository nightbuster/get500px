export class Photo {
  constructor(
    public id: number,
    public image_url: string,
    public like_count: number,
    public dislike_count: number,
    public review_count: number
  ) { }
}
