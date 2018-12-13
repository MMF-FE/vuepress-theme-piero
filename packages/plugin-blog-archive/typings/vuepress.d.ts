declare namespace ArchiveVuepress {
    interface Vue<Frontmatter> {
        $archive: Vuepress.ClassifiableItem<Frontmatter>
        $archives: Vuepress.Classifiable<Frontmatter>
    }
}
