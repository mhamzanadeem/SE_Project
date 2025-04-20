// BROADCASTING

#include <mpi.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
    int rank;
    int data = 0;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    if (rank == 1) {
        data = 99; // Only root process sets the value
    }

    // Broadcast data from rank 1 to all others
    MPI_Bcast(&data, 1, MPI_INT, 1, MPI_COMM_WORLD);

    printf("Process %d received data = %d\n", rank, data);

    MPI_Finalize();
    return 0;
}


// SCATTER

#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, size;
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int sendbuf[8] = {10, 20, 30, 40, 50, 60, 70, 80}; // only valid on root
    int recvbuf[2];  // each process receives 2 elements

    MPI_Scatter(sendbuf, 2, MPI_INT,  // root sends 2 ints to each process
                recvbuf, 2, MPI_INT,  // each process receives 2 ints
                0, MPI_COMM_WORLD);   // root is process 0

    printf("Process %d received: %d %d\n", rank, recvbuf[0], recvbuf[1]);

    MPI_Finalize();
    return 0;
}

// GATHER
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, size;
    int sendbuf[2];
    int recvbuf[8];  // Only used by root

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Each process prepares 2 numbers
    sendbuf[0] = rank * 2 + 1;
    sendbuf[1] = rank * 2 + 2;

    MPI_Gather(sendbuf, 2, MPI_INT,   // Send 2 integers
               recvbuf, 2, MPI_INT,   // Root receives 2 ints from each process
               0, MPI_COMM_WORLD);    // Root is process 0

    if (rank == 0) {
        printf("Root received:\n");
        for (int i = 0; i < size * 2; i++) {
            printf("%d ", recvbuf[i]);
        }
        printf("\n");
    }

    MPI_Finalize();
    return 0;
}

// SCATTERV
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, size;
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int sendbuf[10] = {1,2,3,4,5,6,7,8,9,10};
    int sendcounts[4] = {1, 2, 3, 4};
    int displs[4] = {0, 1, 3, 6};

    int recvcount = sendcounts[rank];   // How many items this rank will receive
    int recvbuf[4];  // Enough to hold any possible recvcount (max = 4)

    MPI_Scatterv(sendbuf, sendcounts, displs, MPI_INT,
                 recvbuf, recvcount, MPI_INT,
                 0, MPI_COMM_WORLD);

    printf("Rank %d received: ", rank);
    for (int i = 0; i < recvcount; i++) {
        printf("%d ", recvbuf[i]);
    }
    printf("\n");

    MPI_Finalize();
    return 0;
}

// GATHERV
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, size;
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int sendcount = rank + 1;
    int sendbuf[4];  // Max possible
    for (int i = 0; i < sendcount; i++) {
        sendbuf[i] = rank * 10 + i;  // Unique values
    }

    int recvbuf[10];  // Only root will use this
    int recvcounts[4] = {1, 2, 3, 4};
    int displs[4]     = {0, 1, 3, 6};

    MPI_Gatherv(sendbuf, sendcount, MPI_INT,
                recvbuf, recvcounts, displs, MPI_INT,
                0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("Root gathered: ");
        for (int i = 0; i < 10; i++) {
            printf("%d ", recvbuf[i]);
        }
        printf("\n");
    }

    MPI_Finalize();
    return 0;
}


// ALLGATHER
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);
    
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int send = rank + 1;
    int recv[size];

    MPI_Allgather(&send, 1, MPI_INT, recv, 1, MPI_INT, MPI_COMM_WORLD);

    printf("Rank %d received: ", rank);
    for (int i = 0; i < size; i++)
        printf("%d ", recv[i]);
    printf("\n");

    MPI_Finalize();
    return 0;
}

// ALLGATHERV
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);
    
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int sendcount = rank + 1;
    int sendbuf[4];
    for (int i = 0; i < sendcount; i++)
        sendbuf[i] = rank * 10 + i;

    int recvbuf[10];
    int recvcounts[4] = {1, 2, 3, 4};       // Elements from each process
    int displs[4]     = {0, 1, 3, 6};       // Where to place them

    MPI_Allgatherv(sendbuf, sendcount, MPI_INT,
                   recvbuf, recvcounts, displs, MPI_INT, MPI_COMM_WORLD);

    printf("Rank %d received: ", rank);
    for (int i = 0; i < 10; i++)
        printf("%d ", recvbuf[i]);
    printf("\n");

    MPI_Finalize();
    return 0;
}

// All to all

#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);

    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    int sendbuf[size];
    for (int i = 0; i < size; i++)
        sendbuf[i] = 10 * rank + i;  // Send unique value to each process

    int recvbuf[size];

    MPI_Alltoall(sendbuf, 1, MPI_INT, recvbuf, 1, MPI_INT, MPI_COMM_WORLD);

    printf("Rank %d received: ", rank);
    for (int i = 0; i < size; i++)
        printf("%d ", recvbuf[i]);
    printf("\n");

    MPI_Finalize();
    return 0;
}


// All to all v
#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);
    
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    // Each process sends a different number of elements
    int sendbuf[100];
    int sendcounts[4] = {1, 2, 3, 4}; // Adjust according to size
    int sdispls[4]    = {0, 1, 3, 6};

    int recvbuf[100];
    int recvcounts[4] = {4, 3, 2, 1}; // Reverse of sendcounts (example)
    int rdispls[4]    = {0, 4, 7, 9};

    // Fill sendbuf with something useful
    for (int i = 0; i < 10; i++) sendbuf[i] = rank * 100 + i;

    MPI_Alltoallv(sendbuf, sendcounts, sdispls, MPI_INT,
                  recvbuf, recvcounts, rdispls, MPI_INT,
                  MPI_COMM_WORLD);

    printf("Rank %d received: ", rank);
    for (int i = 0; i < 10; i++) printf("%d ", recvbuf[i]);
    printf("\n");

    MPI_Finalize();
    return 0;
}


// barriers

#include <mpi.h>
#include <stdio.h>
#include <unistd.h>  // for sleep()

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);
    
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    printf("Before Barrier: Rank %d\n", rank);
    fflush(stdout);

    sleep(rank);  // simulate work taking longer for higher-ranked processes

    MPI_Barrier(MPI_COMM_WORLD);  // All ranks must reach this before continuing

    printf("After Barrier: Rank %d\n", rank);

    MPI_Finalize();
    return 0;
}



// MPI reduce or All reduce
int sendbuf[3] = {rank, rank + 1, rank + 2};
int recvbuf[3];

MPI_Reduce(sendbuf, recvbuf, 3, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);

// OR

int rank, size;
int data, result;
MPI_Comm_rank(MPI_COMM_WORLD, &rank);
MPI_Comm_size(MPI_COMM_WORLD, &size);

data = rank + 1;  // let's say ranks are 0,1,2 → data = 1,2,3

MPI_Reduce(&data, &result, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);

if (rank == 0)
    printf("Sum = %d\n", result);  // Output: Sum = 6


//  Each process calculates partial row sums of a 2D array. 
// The final row sums are gathered on process 0.


#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>

#define N 4  // Number of rows
#define M 4  // Number of columns

int main(int argc, char *argv[]) {
    int rank, size;
    int a[N][M], b_local[N] = {0}, b_global[N] = {0};
    int i, j;
    int local_cols;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank); // Get current process rank
    MPI_Comm_size(MPI_COMM_WORLD, &size); // Get total number of processes

    local_cols = M / size; // Assume M divisible by size

    // Fill matrix a only on rank 0
    if (rank == 0) {
        printf("Original Matrix:\n");
        for (i = 0; i < N; i++) {
            for (j = 0; j < M; j++) {
                a[i][j] = i + j; // simple pattern
                printf("%2d ", a[i][j]);
            }
            printf("\n");
        }
    }

    // Broadcast matrix to all processes
    MPI_Bcast(a, N * M, MPI_INT, 0, MPI_COMM_WORLD);

    // Local computation (partial column-wise summing)
    int start_col = rank * local_cols;
    int end_col = start_col + local_cols;

    for (i = 0; i < N; i++) {
        for (j = start_col; j < end_col; j++) {
            b_local[i] += a[i][j];
        }
    }

    // Reduce all local b arrays into b_global at rank 0
    MPI_Reduce(b_local, b_global, N, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);

    // Print final result
    if (rank == 0) {
        printf("\nFinal Row Sums:\n");
        for (i = 0; i < N; i++) {
            printf("Row %d sum: %d\n", i, b_global[i]);
        }
    }

    MPI_Finalize();
    return 0;
}

Output (example):

Original Matrix:
 0  1  2  3
 1  2  3  4
 2  3  4  5
 3  4  5  6

Final Row Sums:
Row 0 sum: 6
Row 1 sum: 10
Row 2 sum: 14
Row 3 sum: 18
