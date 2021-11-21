export type WebOpsProject = {
    domain: string
    repo: string
}
export type WebOpsBuildConfig = {
    projects: Array<WebOpsProject>
}

