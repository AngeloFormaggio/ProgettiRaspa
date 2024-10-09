#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NOME 30
#define MAX_AUTORE 20
#define MAX_CAT 40
#define BUFFER 512

typedef struct{//struttura per un singolo libro
    char titolo[MAX_NOME];
    char autore[MAX_AUTORE];
    int anno;
    float prezzo;
} Libro;

typedef struct{//struttura per una singola categoria, ogni cat contiene un array di libri che ci sono all'interno
    Libro *libri;//array dinamico
    char nome[MAX_NOME];
    int contLibri;
    int maxLibri;
}Categoria;

int CheckCategoria(Categoria categorie[], char *nomeCategoria, int nCat)
{
    for(int i = 0; i < nCat; i++)
    {
        if(strcmp(categorie[i].nome, nomeCategoria) == 0)
        {
            return i;//ritorno l'indice della categoria che gia esiste
        }
    }
    return -1;
}

void AggiungiLibro(Categoria *categoria, char *bufTitolo, char *bufAutore, int bufAnno, float bufPrezzo)//puntatore alla cat a cui aggungere il libro, titolo, autore, ...
{
    categoria->libri = (Libro *)realloc(categoria->libri, (categoria->maxLibri+1) *sizeof(Libro));//aumento l'array libri in modo da poter tenere un altro libro
    categoria->maxLibri++;

    strcpy(categoria->libri[categoria->contLibri].titolo,bufTitolo);
    strcpy(categoria->libri[categoria->contLibri].autore, bufAutore);
    categoria->libri[categoria->contLibri].anno = bufAnno;
    categoria->libri[categoria->contLibri].prezzo = bufPrezzo;

    categoria->contLibri++;
}

void AggiungiCategoria(Categoria categorie[], int *nCat, char *bufCategoria, char *bufTitolo, char *bufAutore, int bufAnno, float bufPrezzo) 
{
    strcpy(categorie[*nCat].nome, bufCategoria);

    categorie[*nCat].maxLibri = 0;
    categorie[*nCat].maxLibri++;
    categorie[*nCat].libri = malloc(categorie[*nCat].maxLibri * sizeof(Libro));//alloco una grandezza pari a 1 libro all'array Libro *libri(operazione eseguita solo per 1 array libri di una cat nuova, senno modifico la grandezza nel metodo aggiungi libri)
    categorie[*nCat].contLibri = 0;// inizializzo il contatore libir della categoria appena creata

    AggiungiLibro(&categorie[*nCat], bufTitolo,bufAutore,bufAnno,bufPrezzo);

    (*nCat)++;
}

void CaricaLibri(char *nomeFile, Categoria categorie[], int *nCat)
{
    FILE *file = fopen(nomeFile, "r");
    
    if(file == NULL)
    {
        printf("\nERRORE APERTURA FILE");
        exit(-1);
    }

    char bufLinea[BUFFER];

    fgets(bufLinea, BUFFER, file);//leggo e skippo la prima riga che è l'intestazione

    while(fgets(bufLinea,BUFFER,file))//finche non finisce il file leggo riga per riga, quando finisce fgets ritorna NULL
    {
        char bufTitolo[MAX_NOME];
        char bufAutore[MAX_AUTORE];
        char bufCategoria[MAX_NOME];
        int bufAnno;
        float bufPrezzo;

        char *token = strtok(bufLinea, ",");
        if (token) {
            strncpy(bufTitolo, token, MAX_NOME);
            bufTitolo[MAX_NOME - 1] = '\0'; 
        }

        token = strtok(NULL, ",");
        if (token) {
            strncpy(bufAutore, token, MAX_AUTORE);
            bufAutore[MAX_AUTORE - 1] = '\0'; 
        }

        token = strtok(NULL, ",");
        if (token) {
            bufAnno = atoi(token);
        }

        token = strtok(NULL, ",");
        if (token) {
            bufPrezzo = atof(token);
        }

        token = strtok(NULL, ",");
        if (token) {
            strncpy(bufCategoria, token, MAX_NOME);
            bufCategoria[MAX_NOME - 1] = '\0'; 
        }

        int indexCat = CheckCategoria(categorie, bufCategoria, *nCat);

        if(indexCat != -1)
        {//se c'è
            AggiungiLibro(&categorie[indexCat],bufTitolo,bufAutore,bufAnno,bufPrezzo);
        }
        else
        {//se non c'è
            AggiungiCategoria(categorie,nCat,bufCategoria,bufTitolo,bufAutore,bufAnno,bufPrezzo);
        }


    }

    fclose(file);


}

void VisualizzaXCategoria(Categoria categorie[], int nCat) 
{
    for (int i = 0; i < nCat; i++) {
        printf("Categoria: %s\n", categorie[i].nome);
        for (int j = 0; j < categorie[i].contLibri; j++) {
            Libro *libro = &categorie[i].libri[j];
            printf("  Titolo: %s, Autore: %s, Anno: %d, Prezzo: %.2f\n", libro->titolo, libro->autore, libro->anno, libro->prezzo);
        }
    }
}

int CercaLibro(Categoria categorie[], int nCat)
{
    char titoloRicerca[MAX_NOME];
    printf("Inserire il titolo da cercare: ");

    fgets(titoloRicerca, sizeof(titoloRicerca), stdin);
    titoloRicerca[strcspn(titoloRicerca, "\n")] = '\0';

    for(int i = 0; i < nCat; i++)
    {
        for(int j = 0; j < categorie[i].contLibri;j++)
        {
            if(strcmp(categorie[i].libri[j].titolo, titoloRicerca) == 0)
            {
                printf("Il libro è presente:\nTitolo: %s, Autore: %s, Anno: %d, Prezzo: %.2f, Categoria: %s\n",categorie[i].libri[j].titolo,categorie[i].libri[j].autore,categorie[i].libri[j].anno,categorie[i].libri[j].prezzo,categorie[i].nome);
                return 0;
            }
        }
    }
    return 1;
}

void StampaXCategoria(Categoria categorie[],int nCat)
{ 
    int scelta;

    do {
        printf("\nScegli una categoria:\n");
        for(int i = 0; i < nCat; i++)
        {
            printf("%d - %s\n",i,categorie[i].nome);
        }
        scanf("%d", &scelta);
    }while(scelta>nCat || scelta < 0);

    printf("Categoria %s", categorie[scelta].nome);
    for(int i = 0; i < categorie[scelta].contLibri; i++)
    {
        printf("\nTitolo: %s, Autore: %s, Anno: %d, Prezzo: %.2f",categorie[scelta].libri[i].titolo,categorie[scelta].libri[i].autore,categorie[scelta].libri[i].anno,categorie[scelta].libri[i].prezzo);
    }
}

int main(int argc, char* argv[])
{
    Categoria categorie [MAX_CAT];
    int nCat = 0;//numero di categorie totali

    CaricaLibri("libreria_libri.csv", categorie, &nCat);


    int flag = 0,scelta;
    
    do{
        printf("Scegli opzione:\n1-Visualizza libri x Cat\n2-Ricerca libro\n3-Stampa x categoria\n");
        scanf("%d",&scelta);
        getchar();

        switch (scelta) 
        {
            case 1:
            VisualizzaXCategoria(categorie, nCat);
            break;
            case 2:
            if(CercaLibro(categorie, nCat))
            {
                printf("\nLibro non presente\n");
            }
            break;
            case 3:
            StampaXCategoria(categorie,nCat);
            break;
        }

        printf("\nRipetere?  [1]-si [0]-no\n");
        scanf("%d",&flag);

    }while(flag);

    // Libera la dinamica dell' array libri
    for (int i = 0; i < nCat; i++) {
        free(categorie[i].libri);
    }

}