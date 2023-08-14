type TJSONDumpPath = string | undefined;

class DumpsAPI {
  private JSONDumpPath?: TJSONDumpPath = undefined;

  public setJSONDumpPath = (path: TJSONDumpPath) => {
    this.JSONDumpPath = path;
  }
  public getJSONDumpPath = () => this.JSONDumpPath;
}

export default DumpsAPI;
